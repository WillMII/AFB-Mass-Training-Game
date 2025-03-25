using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class SelectedD : MonoBehaviour
{


    public GameObject text;
    public GameObject text1;
    public bool correct;
    public TMP_Text counter;
    public TMP_Text questionCounter;
    //public Canvas correctCanvas;
    //public Canvas answerCanvas;
    public GameObject next;
    public GameObject parent;
    private GameObject parentInstance;
    //public GameObject nextA;
    //public GameObject nextB;
    //public GameObject nextC;
    public GameObject nextD;

    
    //public Canvas questionCanvas;
    //public Canvas questionCanvas;
    private bool alreadyInstantiated = false;
    private bool alreadyClicked;
    private TMP_Text[] answerTexts;
    //private TMP_Text[] answerTexts;
    // Start is called before the first frame update
    void Start()
    {
        /*
        if (alreadyInstantiated == false)
        {
            parentInstance = Instantiate(parent);
            alreadyInstantiated = true;
        }
        */
        //parentInstance = Instantiate(parent);
        //foreach (TMP_Text tmpText in answerCanvas.GetComponentsInChildren<TMP_Text>())
        //{

        //}
        //questionCounter = questionCanvas.GetComponentInChildren<TMP_Text>();
        //answerTexts = answerCanvas.GetComponentsInChildren<TMP_Text>();
        //counter = correctCanvas.GetComponentInChildren<TMP_Text>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OnClick()
    {
        if (alreadyInstantiated == false)
        {
            parentInstance = Instantiate(parent);
            alreadyInstantiated = true;
        }
        //questionCanvas.gameObject.SetActive(true);
        //questionCounter.gameObject.SetActive(true);
        //correctCanvas.gameObject.SetActive(true);
        //answerCanvas.gameObject.SetActive(true);
        questionCounter.text = (int.Parse(questionCounter.text) + 1).ToString();

        TMP_Text textT = text.GetComponent<TMP_Text>();
        textT.text = "D";
        //TMP_Text text = answerTexts[int.Parse(questionCounter.text) - 1];
        //text.gameObject.SetActive(true);
        //text.text = "D";
        //Canvas.ForceUpdateCanvases();
        if (text.gameObject.name == "Answer 1") 
        {
            correct = true;
            Debug.Log("Correct");
        }
        if (correct == true)
        {
            counter.text = (int.Parse(counter.text) + 1).ToString();
        }
        //Canvas.ForceUpdateCanvases();
        GameObject textInstance = Instantiate(text1, parentInstance.transform);
        //textInstance.transform.SetParent(parent.transform, false);
        GameObject.Destroy(textInstance);
        GameObject nextText = Instantiate(next, parentInstance.transform);
        //nextText.transform.SetParent(parent.transform, false);
        GameObject dNext = Instantiate(nextD, parentInstance.transform);
        //dNext.transform.SetParent(parent.transform, false);
        nextText.gameObject.SetActive(true);
    }
}
