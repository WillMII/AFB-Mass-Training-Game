using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class Selected1 : MonoBehaviour
{


    public GameObject text;
    public TMP_Text text1;
    public bool correct;
    public TMP_Text counter;
    public TMP_Text questionCounter;

    public GameObject next;
    private GameObject parent;
    private ActivateQuiz parentAQ;

    public GameObject nextA;
    public GameObject nextB;
    public GameObject nextC;
    public GameObject nextD;
    public GameObject currentA;
    public GameObject currentB;
    public GameObject currentC;
    public GameObject currentD;
    //public Keypad getQuiz;
    
    private GameObject textF;
    private GameObject text1Instance;

    private bool alreadyClicked;
    private TMP_Text[] answerTexts;

    void Start()
    {
        //GameObject activateQuiz = GameObject.Find("Padlock");
        //parentAQ = activateQuiz.GetComponent<ActivateQuiz>();
        //parent = parentAQ.getInstance();

    }

    // Update is called once per frame
    void Update()
    {

    }

    public void OnClick()
    {




        questionCounter.text = (int.Parse(questionCounter.text) + 1).ToString();

        TMP_Text textT = text.GetComponent<TMP_Text>();
        string answer = this.gameObject.name;
        if (answer == "A 1")
        {
            textT.text = "A";
        } else if (answer == "B 1")
        {
            textT.text = "B";
        } else if (answer == "C 1")
        {
            textT.text = "C";
            correct = true;
        } else if (answer == "D 1")
        {
            textT.text = "D";
            
        }
        //textT.text = "D";
        /*
        if (text.gameObject.name == "Answer 1")
        {
            correct = true;
            Debug.Log("Correct");
        }
        */
        if (correct == true)
        {
            counter.text = (int.Parse(counter.text) + 1).ToString();
        }

        Debug.Log("Next text instantiated");
        //nextText.transform.SetParent(parent.transform, false);
        //GameObject dNext = Instantiate(nextD, parent.transform);
        Debug.Log("dNext instantiated");
        //dNext.transform.SetParent(parent.transform, false);
        text1.gameObject.SetActive(false);
        
        currentA.gameObject.SetActive(false);
        currentB.gameObject.SetActive(false);
        currentC.gameObject.SetActive(false);
        currentD.gameObject.SetActive(false);
        next.gameObject.SetActive(true);
        nextA.gameObject.SetActive(true);
        nextB.gameObject.SetActive(true);
        nextC.gameObject.SetActive(true);
        nextD.gameObject.SetActive(true);


    }
}
