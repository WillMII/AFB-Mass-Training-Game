using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class SelectedD : MonoBehaviour
{


    public GameObject text;
    public TMP_Text text1;
    public bool correct;
    public TMP_Text counter;
    public TMP_Text questionCounter;
    //public Canvas correctCanvas;
    //public Canvas answerCanvas;
    public GameObject next;
    private GameObject parent;
    private Keypad parentK;
    //public GameObject nextA;
    //public GameObject nextB;
    //public GameObject nextC;
    public GameObject nextD;
    public Keypad getQuiz;
    public Button itself;
    private GameObject textF;
    private GameObject text1Instance;
    //public Canvas questionCanvas;
    //public Canvas questionCanvas;
    //private bool alreadyInstantiated = false;
    private bool alreadyClicked;
    private TMP_Text[] answerTexts;
    //private TMP_Text[] answerTexts;
    // Start is called before the first frame update
    void Start()
    {
        GameObject keypad = GameObject.Find("Keypad");
        parentK = keypad.GetComponent<Keypad>();
        parent = parentK.getInstance();
        /*
        if (GameObject.Find("Text 2") != null && GameObject.Find("Text 2").GetComponent<TMP_Text>().gameObject.activeSelf == true)
        {
            textF = GameObject.Find("Text 2");

        }
        else if (GameObject.Find("Text 3") != null && GameObject.Find("Text 3").GetComponent<TMP_Text>().gameObject.activeSelf == true)
        {
            textF = GameObject.Find("Text 3");
        }
        */
        //itself = GameObject.Find("D1").GetComponent<Button>();
        //parent = getQuiz.getInstance();
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
        
        
        /*
        if (alreadyInstantiated == false)
        {
            parentInstance = Instantiate(parent);
            alreadyInstantiated = true;
        }
        */
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
        //GameObject textInstance = Instantiate(text1, parent.transform);
        //textInstance.transform.SetParent(parent.transform, false);
        //GameObject.Destroy(textInstance);
        GameObject nextText = Instantiate(next, parent.transform);
        Debug.Log("Next text instantiated");
        //nextText.transform.SetParent(parent.transform, false);
        GameObject dNext = Instantiate(nextD, parent.transform);
        Debug.Log("dNext instantiated");
        //dNext.transform.SetParent(parent.transform, false);
        nextText.gameObject.SetActive(true);
        dNext.gameObject.SetActive(true);
        //Debug.Log(text1.gameObject.name);
        if (GameObject.Find("Text (TMP)") != null)
        {
            text1Instance = GameObject.Find("Text (TMP)");
        } else if (GameObject.Find("Text 2") != null)
        {
            text1Instance = GameObject.Find("Text 2(Clone)");
        }
        if (text1Instance != null) 
        {
            Destroy(text1Instance);
        }
        
        //text1.gameObject.SetActive(false);
        /*
        if (text1 != null)
        {
            text1.gameObject.SetActive(false);
        }
        
        else
        {
            //Debug.LogError("text1 is null!");
        }
        */
        /*
        if (textF != null)
        {
            textF.gameObject.SetActive(false);
        }
        */
        itself.gameObject.SetActive(false);
        Canvas.ForceUpdateCanvases();

    }
}
