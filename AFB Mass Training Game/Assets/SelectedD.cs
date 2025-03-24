using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class SelectedD : MonoBehaviour
{


    public TMP_Text text;
    public GameObject text1;
    public bool correct;
    public TMP_Text counter;
    public TMP_Text questionCounter;
    //public Canvas correctCanvas;
    //public Canvas answerCanvas;
    public GameObject next;
    public GameObject parent;

    public GameObject nextA;
    public GameObject nextB;
    public GameObject nextC;
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
        //questionCanvas.gameObject.SetActive(true);
        //questionCounter.gameObject.SetActive(true);
        //correctCanvas.gameObject.SetActive(true);
        //answerCanvas.gameObject.SetActive(true);
        questionCounter.text = (int.Parse(questionCounter.text) + 1).ToString();

        text.text = "D";
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
        GameObject.Destroy(text1);
        Instantiate(next.gameObject, parent.transform);
        next.gameObject.SetActive(true);
    }
}
